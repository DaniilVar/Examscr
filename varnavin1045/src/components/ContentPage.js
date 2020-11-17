import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import InputMask from 'react-input-mask';
//import "react-datepicker/dist/react-datepicker.css";

function ContentPage() {

    const API = "http://localhost:3004/students"

    const [sortParam, setSortParam]     = useState("?_sort=surname&_order=asc")
    const [searchParam, setSearchParam] = useState("")

    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState("")

    const [data, setData]             = useState([])
    const [surname, setSurname]       = useState("")
    const [name, setName]             = useState("")
    const [patronymic, setPatronymic] = useState("")
    const [phone, setPhone]           = useState("")
    const [email, setEmail]           = useState("")
    const [birth, setBirth]           = useState("")
    const [group, setGroup]           = useState("")
    const [direction, setDirection]   = useState("")

    useEffect(() => {
        if(searchParam === "" || searchParam === " "){
            axios.get(API+'/'+sortParam)
                .then(res => {
               setData(res.data);
            });
        }
    });
    function handleSurnameChange(text) {
        setSurname(text)
        console.log(text)
    }
    function handleNameChange(text) {
        setName(text)
        console.log(text)
    }
    function handlePatronymicChange(text) {
        setPatronymic(text)
        console.log(text)
    }
    function handlePhoneChange(text) {
        setPhone(text)
        console.log(text)
    }
    function handleEmailChange(text) {
        setEmail(text)
        console.log(text)
    }
    function handleBirthChange(text) {
        setBirth(text)
        console.log(text)
    }
    function handleGroupChange(text) {
        setGroup(text)
        console.log(text)
    }
    function handleDirectionChange(text) {
        setDirection(text)
        console.log(text)
    }
    function handleDeleteItem(id){  
        axios.delete(API+`/`+`${id}`)
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
          setEditId("")
          setIsEdit(false)
          setSurname("")
          setName("")
          setPatronymic("")
          setPhone("")
          setEmail("")
          setBirth("")
          setGroup("")
          setDirection("")
        setData([])
        setSearchParam("")
    }
    function handleEditItem(id, nsurname, nname, npatronymic, nphone, nemail, ngroup, nbirth, ndirection){
        setEditId(id)
        setIsEdit(true)
        setSurname(nsurname)
        setName(nname)
        setPatronymic(npatronymic)
        setPhone(nphone)
        setEmail(nemail)
        setBirth(nbirth)
        setGroup(ngroup)
        setDirection(ndirection)
    }

    function sortByGroup(){
        sortParam === "?_sort=group&_order=asc" 
        ?
        setSortParam("?_sort=group&_order=desc")
        :
        setSortParam("?_sort=group&_order=asc")
    }
    function sortByDirection(){
        sortParam === "?_sort=direction&_order=asc" 
        ?
        setSortParam("?_sort=direction&_order=desc")
        :
        setSortParam("?_sort=direction&_order=asc")
    }
    function sortBySurname(){
        sortParam === "?_sort=surname&_order=asc" 
        ?
        setSortParam("?_sort=surname&_order=desc")
        :
        setSortParam("?_sort=surname&_order=asc")
    }
    function sortById(){
        sortParam === "?_sort=id&_order=asc" 
        ? 
        setSortParam("?_sort=id&_order=desc") 
        :
        setSortParam("?_sort=id&_order=asc") 
    }
    function handleEditItemAdd(event){
        let tempDate = birth
        if((tempDate.substring(0,1)+0) < 32){
            console.log("correct day")
            if((tempDate.substring(3,4)+0) < 13){
                console.log("correct month")
                axios.put(API+'/'+editId, {
                    surname: surname, 
                    name: name,
                    patronymic: patronymic,
                    phone: phone,
                    email: email,
                    birth: birth,
                    group: group,
                    direction: direction
                }).then(resp => { 
                  console.log(resp.data);
                }).catch(error => {
                  console.log(error);
                });  
                setEditId("")
                setIsEdit(false)
                setSurname("")
                setName("")
                setPatronymic("")
                setPhone("")
                setEmail("")
                setBirth("")
                setGroup("")
                setDirection("")
                setData([])
                setSearchParam("")
            }else{
               alert("Неверно указан месяц");
            }
        }else{
           alert("Неверно указано число рождения");
        }
        event.preventDefault();
    }
    function handleNewItemAdd(event){
        let tempDate = birth
        if((tempDate.substring(0,1)+0) < 32){
            console.log("correct day")
            if((tempDate.substring(3,4)+0) < 13){
                console.log("correct month")
                const newStudent = {
                    surname: surname, 
                    name: name,
                    patronymic: patronymic,
                    phone: phone,
                    email: email,
                    birth: birth,
                    group: group,
                    direction: direction
                };
                axios.post(API, newStudent)
                  .then(res => {
                    console.log(res);
                    console.log(res.data);
                  })
                setSurname("")
                setName("")
                setPatronymic("")
                setPhone("")
                setEmail("")
                setBirth("")
                setGroup("")
                setDirection("")
            }else{
               alert("Неверно указан месяц");
            }
        }else{
           alert("Неверно указано число рождения");
        }
        event.preventDefault();
    }
    function handleSearchParam(text){
        setSearchParam(text)
        searchStudent(searchParam)
    }
    function searchStudent(text){
        //console.log("search: "+text)
        let tempData = []
        data.map(item => 
            {
                if(item.group.includes(text) || item.direction.includes(text)){
                    tempData = [...tempData, item]
                }
            }
        )
        //console.log(tempData)
        setData(tempData)
    }
  return (
    <div className="ContentPage">
     <div>
         {
             !isEdit ? 
             <h4>Добавить студента</h4>
             :
             <h4>Редактирование студента</h4>
         }
         <form onSubmit={!isEdit ? event => handleNewItemAdd(event) : event => handleEditItemAdd(event)}>
         <input 
            type="text" 
            className="form-control" 
            value={surname} 
            required 
            onChange={e => handleSurnameChange(e.target.value)}
            placeholder="Фамилия..."></input>
         <input 
            type="text" 
            value={name} 
            required 
            onChange={e => handleNameChange(e.target.value)}
            className="form-control mt-1" 
            placeholder="Имя..."></input>
         <input 
            type="text" 
            value={patronymic} 
            required 
            onChange={e => handlePatronymicChange(e.target.value)}
            className="form-control mt-1" 
            placeholder="Отчество..."></input>
        <InputMask 
            placeholder="Телефон..." 
            mask="+7 (999) 999 99 99"
            onChange={e => handlePhoneChange(e.target.value)} 
            value={phone} 
            required 
            className="form-control mt-1" />
         <input 
            type="email" 
            required 
            value={email} 
            onChange={e => handleEmailChange(e.target.value)}
            className="form-control mt-1" 
            placeholder="Email..."></input>
         {//<DatePicker selected={startDate}  onChange={e => handleBirthChange(e.target.value)} />
         }
         <InputMask 
            placeholder="Дата рождения" 
            mask="99-99-9999" 
            name="birthinput"
            onChange={e => handleBirthChange(e.target.value)} 
            value={birth}
            required 
            className="form-control mt-1" />   
         <InputMask 
            placeholder="Группа" 
            mask="999-999" 
            
            onChange={e => handleGroupChange(e.target.value)} 
            value={group}
            required 
            className="form-control mt-1" />   
         <input 
            type="text" 
            value={direction} 
            required 
            onChange={e => handleDirectionChange(e.target.value)}            
            className="form-control mt-1" 
            placeholder="Направление"></input>
        {
            isEdit ? 
            <>
                <input type="submit"
                className="submit form-control btn btn-success mt-2"
                value="Подтвердить редактирование"
                ></input>
                <button 
                className="submit form-control btn btn-danger mt-2"
                onClick={() => handleDeleteItem(editId)}>Удалить</button>
            </>
                :
                
            <input type="submit"
            value="Добавить студента"
                className="btn form-control btn-primary mt-2"
            ></input>
        }

         </form>
     </div>
     {
         isEdit ? 
         <></>
         :
         <>
            <h5 className="mt-2">Поиск студента</h5>
            <input 
                type="text"
                placeholder="Направление, номер группы..."
                className="form-control"
                value={searchParam}
                onChange={e => handleSearchParam(e.target.value)}
            ></input>
         </>
     }
     
     <h5 className="mt-2">Список студентов</h5>
     <div>
     <table className="table table-striped mt-2">
        <thead className="thead-dark">
        <tr>
          <th><span className="sortlink" onClick={() => sortById()}>ID</span></th>
          <th><span className="sortlink" onClick={() => sortBySurname()}>ФИО</span></th>
          <th><span className="sortlink" onClick={() => sortByGroup()}>Номер группы</span></th>
          <th><span className="sortlink" onClick={() => sortByDirection()}>Направление подготовки</span></th>
          <th>Редактировать</th>
        </tr>
        </thead>
        <tbody>
        {
            !isEdit ? 
            data.map((item, i) => (
                <tr key={i}>
                    <td>{item.id}</td>
                    <td>
                        {item.surname + ' ' + item.name.substring(0,1)+'.'+item.patronymic.substring(0,1)+'.'}
                    </td>
                    <td>{item.group}</td>
                    <td>{item.direction}</td>
                    <td>
                        <button 
                        className="btn btn-warning" 
                        onClick={() => handleEditItem(item.id, item.surname, item.name, item.patronymic, item.phone, item.email, item.group, item.birth, item.direction)}>Редактировать</button>
                    </td>
                </tr>
                )
            ) : null
        }
      </tbody>
      </table>
     </div>
    </div>
  );
}
export default ContentPage;
