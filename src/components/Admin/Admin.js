import React, { useEffect, useState } from 'react'
import "../Signup.css"
import axios from 'axios';
import Chart from './Chart';

const Admin = () => {
  let [list,setList] = useState([]);


    useEffect ( ()=>{
      axios.get("http://localhost:8000/collections")
      .then( (res) =>{
        setList(res.data);
        console.log(res.data)
      })
      .catch( (err) =>{
        console.log("data error: " + err)
      })
    },[]);

   // Aggregate counts for each month
   const chartData = list.reduce((acc, curr) => {
    const existingMonth = acc.find(item => item.month === curr.lastLogin);
    if (existingMonth) {
      existingMonth.count += parseInt(curr.count);
    } else {
      acc.push({
        month: curr.lastLogin,
        count: parseInt(curr.count)
      });
    }
    return acc;
  }, []);



  return (
    <div>

    {/*-------------- Navbar ----------------------- */}


        <nav className="navbar">
  <div className="container-fluid">
   <div>
        <a className="navbar-brand" href='/admin'>Home</a>
        <a className="navbar-brand" href='/admin'>Graph</a>
   </div>
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>


{/* ----------------------Table ---------------------- */}
<div className='table'>
    
    <table className="table table-bordered">
      <thead className='table-info'>
          <tr id='tableHeading'>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Count</th>
            <th>Last Login Date</th>
          </tr>
      </thead>

      {
        list.map((data, index) =>{
          return (
            <tbody key={data.index}>
          <tr>
            <td>{index +1}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.count}</td>
            <td>{data.lastLogin}</td>
          </tr>
          
         
      </tbody>
          )
        })
      }
    </table>
    
</div>

<div className='chartContainer'><Chart data={chartData}/></div>

    </div>
  )
}

export default Admin