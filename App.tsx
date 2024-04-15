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

function App() { 
  const today = new Date();
  
  const [carNo, setCarNo] = useState('11号車(3384)');
  const [data, setData] = useState<any[]>([]);
  
  const [inputDay, setInputDay] = React.useState<Dayjs | null>(dayjs(today));
  const [startTime, setStartTime] = React.useState<Dayjs | null>(dayjs('2024-2-16T24:00'));
  const [endTime, setEndTime] = React.useState<Dayjs | null>(dayjs('2024-2-16T24:00'));
  const inputDate=dayjs(inputDay).format("MM/DD")

  const handleClick= async ()=>{
    const inputDate=dayjs(inputDay).format("MM/DD")
    const inputStartTime=dayjs(startTime).format("HH:mm")
    const inputEndTime=dayjs(endTime).format("HH:mm")

    // const id = data.length.toString()

  const listData={
    carNo:carNo,
    obserbDay:inputDate,
    obserbTime:inputStartTime,
    obserbTime2:inputEndTime,    
}

    await addDoc(collection(db,"cars"),{
      carNo:carNo,
      obserbDay:inputDate,
      obserbTime:inputStartTime,
      obserbTime2:inputEndTime,
    })
    
    const list=[...data];
    setData(list)

    const usersRef = collection(db, "cars");
    const q = query(usersRef,where("carNo", "==", carNo),
    where("obserbDay", "==", inputDate));
    
    const querySnapshot = await getDocs(q);
    const newData = querySnapshot.docs.map((doc) => (
      { id: doc.id, data: doc.data()}));
    setData(newData);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCarNo(event.target.value as string);
  }

  const deleteClick=async(id:string)=>{
    alert(id)
    const numericId=parseInt(id,10);
    await deleteDoc(doc(db,"cars",id));
    const deleteData = data.filter((data)=>data.id !==id);
    setData(deleteData)
  }
 
  useEffect(() => {
    (async () => {
      const inputDate = dayjs(inputDay).format("MM/DD"); 
      const usersRef = collection(db, "cars");
      const q = query(usersRef, where("carNo", "==", carNo), where("obserbDay", "==", inputDate));
      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
      setData(newData);
    })();
  }, [carNo, inputDay]);

   
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
                <MenuItem value={"11号車(3384)"}>11号車(3384)</MenuItem>
                <MenuItem value={"12号車(3386)"}>12号車(3386)</MenuItem>
                <MenuItem value={"13号車(3389)"}>13号車(3389)</MenuItem>
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
              <Grid item sm={3}>
                <h1>{carNo}</h1>
                <table>
                  <thead>
                    <tr>
                      <th>使用開始</th>
                      <th>　使用終了</th>
                      <th></th>
                    </tr>
                  </thead>
                </table>
              <div>
                {data && (
                  <div>
                    <table>
                      <tbody>
                    {data.map((item) => (
                      <tr key={item.data.id}>
                        <td>　{item.data.obserbTime}</td>
                        <td>　　 {item.data.obserbTime2}</td>
                        <td><Button size="large" variant="contained" color="success" 
                        onClick={()=>deleteClick(item.id)}>削除</Button></td>
                      </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              </Grid>



            </Grid>
          </Grid>
         </div>  

      </Grid>
  );
}

export default App;
// function setCarNo(arg0: string) {
//   throw new Error('Function not implemented.');
// }

// function doc(db: Firestore, arg1: string, id: any) {
//   throw new Error('Function not implemented.');
// }

