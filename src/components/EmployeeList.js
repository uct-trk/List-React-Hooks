import { Badge, Button, Modal, Alert } from 'react-bootstrap'
import { useContext, useEffect, useRef, useState } from 'react'
import { EmployeeContext } from '../context/EmployeeContext'
import Employee from './Employee'
import AddForm from './AddForm'
import Pagination from './Pagination' 

const EmployeeList = () => {

    const { sortedEmployees} = useContext(EmployeeContext)

    const [show, setShow] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [employeesPerPage] = useState(3)

    const handleShow = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }


    const handleShowAlert = () => {
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 3000)
    }

    //Modal Değişiklik onaylandığı zaman kapanır
    // elemanı ve toplam eleman sayısı yazar
    useEffect(() => {
        handleClose();

        return () => {
            handleShowAlert();
        }
    }, [sortedEmployees])

    // pagination ile ilgili kodlar
    const indexOfLastEmployee = currentPage * employeesPerPage
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
    const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee)
    const totalPagesNum = Math.ceil(sortedEmployees.length / employeesPerPage)

    /*  const myRef = useRef(null)
     const onButtonClick = () => {
         myRef.current.focus()
     } */

    return (
        <>
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Manage <b>Employees</b></h2>
                    </div>
                    <div className="col-sm-6">
                        <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></Button>
                    </div>
                </div>
            </div>

            <Alert show={showAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>
                Employee List Successfully Updated
            </Alert>

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentEmployees.map((employee) => (
                            <tr key={employee.id}>
                                <Employee employee={employee} />
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Pagination 
                pages={totalPagesNum} 
                setCurrentPage={setCurrentPage}
                currentEmployees={currentEmployees}
                sortedEmployees={sortedEmployees}/>

            <Modal show={show} onHide={handleClose}>
                <Modal.Title className="text-center">
                    Add Employee
            </Modal.Title>
                <Modal.Body>
                    <AddForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button className="w-100" onClick={handleClose} variant="danger">
                        CLOSE
                </Button>
                </Modal.Footer>
            </Modal>
            {/* <input ref={myRef} type="text"></input>
        <button onClick={onButtonClick}>Focus Input</button> */}
        </>
    )
}
export default EmployeeList

// listedeki isimleri sıralamak için kullanılır
// .sort((a,b) => a.name.localeCompare(b.name))
