import {useState,useEffect} from 'react';
import Appbar from './component/Appbar';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './App.css';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { initializeApp } from "firebase/app";
import { Firestore, deleteDoc, getFirestore } from "firebase/firestore";
import { collection,addDoc,doc,query,getDocs,where,orderBy,setDoc} from "firebase/firestore";
import React from 'react';
import {db} from './firebase'
import StickyHeadTable from  './component/table';

interface ObservationData {
  id: string;
  carNo: string;
  obserbDay: string;
  obserbTime: string;
  obserbTime2: string;
}

function App() { 
  const today = new Date();
  
  const [carNo, setCarNo] = useState('11号車(1111)');
  const [data, setData] = useState<any[][]>([]);

  
  const [inputDay, setInputDay] = React.useState<Dayjs | null>(dayjs(today));
  const [startTime, setStartTime] = React.useState<Dayjs | null>(dayjs('2024-2-16T24:00'));
  const [endTime, setEndTime] = React.useState<Dayjs | null>(dayjs('2024-2-16T24:00'));
  const inputDate=dayjs(inputDay).format("MM/DD")


  const cars=["11号車(1111)","12号車(2222)","13号車(3333)"]
 
  const handleClick= async ()=>{
    const inputDate=dayjs(inputDay).format("MM/DD")
    const inputStartTime=dayjs(startTime).format("HH:mm")
    const inputEndTime=dayjs(endTime).format("HH:mm")

    
  // if(inputStartTime==inputEndTime){
  //   alert("開始時間と終了時間が同じです")
  //   return false
  // }

  // if(inputStartTime>inputEndTime){
  //   alert("開始時間と終了時間が逆転しています")
  //   return false
  // }
  
  const isCarFound = data.some(carArray => {
    const findStartTime = carArray.find(carItem => carItem.data.obserbTime == inputStartTime && carItem.data.carNo == carNo);
    if (findStartTime) {
      alert("エラー: 一致する要素が見つかりました");
      return true; // 条件に一致する要素が見つかったので、some()メソッドの処理を停止します
    }
    return false; // 条件に一致する要素が見つからなかったので、処理を続けます
  });
  
  if (isCarFound) {
    console.log("ループを終了しました");
    return false
  } else {
    console.log("一致する要素は見つかりませんでした");
  }
  
  const carDetail={
    carNo:carNo,
    obserbDay:inputDate,
    obserbTime:inputStartTime,
    obserbTime2:inputEndTime,
  }

    await addDoc(collection(db,"cars"),carDetail)
    
    const usersRef = collection(db, "cars");
    const q = query(usersRef,where("obserbDay", "==", inputDate));
  
    const querySnapshot = await getDocs(q);
    const newData = querySnapshot.docs.map((doc) => (
      { id: doc.id, data: doc.data()}));
    
      let filteredCars = [];

      for(let car of cars){
        const filteredData=newData.filter(data => {
          return data.data.carNo == car 
        })
        filteredCars.push(filteredData);
      }

      // console.log(filteredCars)
      setData(filteredCars)
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCarNo(event.target.value as string);
  }

  const deleteClick = async (id: string) => {
    await deleteDoc(doc(db, "cars", id)); // Firebaseからの削除
      //arrayの場合はmapをかけてデータを取り出し、その中で1つ1つフィルターをかけていく(編集も同じ)
    const newFilteredData = data.map(innerArray =>   
      innerArray.filter(item => item.id !== id)
    );
    
    setData(newFilteredData);
  };
  
  useEffect(() => {
      (async () => {
        const inputDate = dayjs(inputDay).format("MM/DD"); 
        const usersRef = collection(db, "cars");
        const q = query(usersRef,where("obserbDay", "==", inputDate));
        const querySnapshot = await getDocs(q);
        const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));   
        
          let filteredCars = [];
          for(let car of cars){
            const filteredData=newData.filter(data => {
              return data.data.carNo == car 
            })
            filteredCars.push(filteredData);
          }
          setData(filteredCars)
          })();
       }, [carNo,inputDate]);

  
  return (

    <Grid className="grd" container direction="column">
      <Grid item>
        <Appbar />
      </Grid>
      <div className="App">
      <Grid item container spacing={2}>
        <Grid item sm={3}/>
        <Grid item sm={1.2}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={carNo}
                label="carNo"
                onChange={handleChange}
              >
                <MenuItem value={"11号車(1111)"}>11号車(1111)</MenuItem>
                <MenuItem value={"12号車(2222)"}>12号車(2222)</MenuItem>
                <MenuItem value={"13号車(3333)"}>13号車(3333)</MenuItem>
            </Select>
          </Grid>
          <Grid item sm={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    label="予約日時"
                    value={inputDay}
                    format="YY/M/D"
                    onChange={(newValue) => setInputDay(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

          <Grid item sm={2} >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker', 'TimePicker']}>
                  <TimePicker
                    label="開始時間"
                    value={startTime}
                    ampm={false}
                    onChange={(newStartTime) => setStartTime(newStartTime)}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker', 'TimePicker']}>
                  <TimePicker
                    label="終了時間"                 
                    value={endTime}
                    ampm={false}
                    onChange={(newEndTime) => setEndTime(newEndTime)}
                  />
                </DemoContainer>
              </LocalizationProvider>

          </Grid>

          <Grid item sm={1}>
            <Button variant="contained" size="large" onClick={handleClick}>
              予約
            </Button>
          </Grid>
          <Grid item sm={1}>

          </Grid>
          <Grid item container>
            <Grid item sm={1}/>
            </Grid>

          <Grid item container>
            <Grid item sm={1}/>
            <h1>{inputDate}</h1>
            </Grid>

            <Grid item container>
            <Grid item sm={1}/>
             {data.map((all)=>{
              return all.map((item)=>{
                return<p>{item.carNo}</p>;
             })
            })}

              {data.map((carData, Index) => (
              <Grid item sm={2.5}>
                    <h2>{cars[Index]}</h2>
                      <div key={Index}> 
                        {carData.map((item) => (
                          <tr key={item.data.id}>
                            <td>{item.data.obserbTime}</td>
                            <td>～</td>
                            <td>{item.data.obserbTime2}</td>
                            <td><Button size="large" variant="contained" color="success" 
                                onClick={()=>deleteClick(item.id)}>削除</Button></td>
                          </tr>
                        ))}
                      </div>
                </Grid>
                )) 
              }
              {/* <StickyHeadTable/> */}
            </Grid>
          </Grid>
         </div>  
      </Grid>
  );
}

export default App;

