import  {useEffect, useState} from "react"
import { useSelector } from "react-redux";

import axios from 'axios'


function DataFetchin(){
    const [user, setUser] = useState([])
    const token = useSelector((state) => state.token);
     console.log(token)
    const config = {
        Cookies: { "Authorization": token }
    };

    const URL='http://localhost:8000/users/profile';

  useEffect(()=>{
     axios.get(URL, config)
    .then(
      res=>{
        if (res.status === 200) {
          let userPayload = res.data;
          console.log('User payload info: ' + userPayload);
        }
        console.log('no odja',res)
      })
    .catch(err=>{
      console.log(URL, config)
        console.error('yh',err)
    })
  })
  return (
        <div>
            <ul>
                {
                user.map(user=><li key={user.id}>{user.name}</li>)
                }
            </ul>
        </div>
    )
}

export default DataFetchin;

