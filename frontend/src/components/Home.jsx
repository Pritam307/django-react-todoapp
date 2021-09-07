import React,{useEffect,useState,useRef} from 'react';
import logo from '../logo.svg';
import {Modal,Button} from "react-bootstrap";

const Home = () => {

    const [todoList,setTodoList] = useState([]);
    const [addModal,setAddModal] = useState(false);
    const [delModal,setDeletModal] = useState(false);
    const [editModal,setEditModal] = useState(false);


    const [TodoId,setTodoId] = useState(null);



    const nameRef = useRef('');
    const startRef = useRef('');
    const endRef = useRef('');
    const detailsRef = useRef('');
    const statusRef = useRef('');

    const enameRef = useRef('');
    const estartRef = useRef('');
    const eendRef = useRef('');
    const edetailsRef = useRef('');
    const estatusRef = useRef('');

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/get_list")
        .then(res=>res.json())
        .then(response=>{
            if(response.status === "success"){
                console.log(response.data);
                setTodoList(response.data)
                localStorage.setItem("csrf_token",response.csrf_token)
            }
        }).catch(error=>{
            console.log(error);
        })
    },[])

    const handleAddTodo=()=>{
        try{
            fetch("http://127.0.0.1:8000/api/add_todo",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:nameRef.current.value,
                    startDate:startRef.current.value,
                    endDate:endRef.current.value,
                    details:detailsRef.current.value,
                    status:statusRef.current.value,
                })
            })
            .then(res=>res.json())
            .then(response=>{
                if(response.status === "success"){
                    console.log(response.data);
                    setTodoList(prevState=>{
                        return [
                            response.data,
                            ...prevState
                        ]
                    })
                    setAddModal(false);
                }
            })
            .catch(error=>{
                console.log(error);
            })

        }catch(error){
            console.log(error);
        }
    }

    const handleDelModal=(id)=>{
        setDeletModal(true)
        setTodoId(id)
    }

    const handleDeleteTodo=()=>{
        if(TodoId){
            try{
                fetch("http://127.0.0.1:8000/api/delete_todo",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        id:TodoId
                    })
                }).then(res=>res.json())
                .then(response=>{
                    if(response.status === "success"){
                        setTodoList(todoList.filter((f)=>f.id !== TodoId))
                        setDeletModal(false);
                        setDeletModal(false);
                    }
                    setTodoId(null)
                })
            }catch(e){
                console.log(e);
            }
        }
    }

    const handleEditModal=(id)=>{
        setTodoId(id)
        setEditModal(true)
    }

    const handleEditTodo=()=>{
        if(TodoId){
            let todo_obj={};
            todo_obj.id=TodoId;
            if(enameRef.current.value){
                todo_obj.name = enameRef.current.value
            }
            if(estartRef.current.value){
                todo_obj.startDate = estartRef.current.value
            }
            if(eendRef.current.value){
                todo_obj.endDate = eendRef.current.value
            }
            if(edetailsRef.current.value){
                todo_obj.details = edetailsRef.current.value
            }
            if(estatusRef.current.value){
                todo_obj.status = estatusRef.current.value
            }
            console.log(todo_obj);
            fetch("http://127.0.0.1:8000/api/edit_todo",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(todo_obj)
            }).then(res=>res.json())
            .then(response=>{
                if(response.status === "success"){
                    console.log(response.data);
                    setTodoList(todoList.filter((f)=>f.id !== TodoId))
                    setTodoList(prevState=>{
                        return [
                            response.data,
                            ...prevState
                        ]
                    })
                    setEditModal(false);
                }
            })
        }
    }

    return (
        <div className="row border border-dark justify-content-center p-3">
            <div className="col-12 font-weight-bold" style={{fontSize:"30px"}}>TODO APP</div>
            <img src={logo} className="App-logo" alt="logo" width="10" />
            <div className="col-12">
                <button className="btn btn-primary my-4" onClick={()=>setAddModal(true)}>Add New Todo</button>
            </div>

            <div className="col-10 mt-3">
                <table class="table table-bordered border-primary">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Created Date</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Details</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todoList.map((item,index)=>(
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.created_at}</td>
                                    <td>{item.from_date} <br/>
                                    </td>
                                    <td>{item.to_date} <br/>
                                    </td>
                                    <td>{item.details}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary m-2" onClick={()=>handleEditModal(item.id)}>Edit</button>
                                        <br/>
                                        <button className="btn btn-sm btn-danger m-2" onClick={()=>handleDelModal(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                       
                    </tbody>
                </table>
            </div>
                        
            
            {/* Add Modal */}
            <Modal show={addModal} onHide={()=>setAddModal(!addModal)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Enter Todo Name</label>
                        <input type="email" ref={nameRef} className="form-control" id="name" required/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Start From</label>
                        <input type="date" ref={startRef} className="form-control" id="startDate" required/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" className="form-label">End To</label>
                        <input type="date" ref={endRef} className="form-control" id="endDate" required/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Details</label>
                        <input type="text" ref={detailsRef} className="form-control" id="details" required/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Status</label>
                        <input type="text" ref={statusRef} className="form-control" id="status" required/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setAddModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddTodo}>
                        Add Todo
                    </Button>
                </Modal.Footer>
            </Modal>

             {/* Edit Modal */}
             <Modal show={editModal} onHide={()=>setEditModal(!editModal)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Enter Todo Name</label>
                        <input type="email" ref={enameRef} className="form-control" id="name" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Start From</label>
                        <input type="date" ref={estartRef} className="form-control" id="startDate" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" className="form-label">End To</label>
                        <input type="date" ref={eendRef} className="form-control" id="endDate" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Details</label>
                        <input type="text" ref={edetailsRef} className="form-control" id="details" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Status</label>
                        <input type="text" ref={estatusRef} className="form-control" id="status" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditTodo}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* Delete Modal */}
            <Modal show={delModal} onHide={()=>setDeletModal(!delModal)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="font-weight-bold">Are You Sure About It?</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setDeletModal(false)}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteTodo}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Home;