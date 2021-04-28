import { createContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
export const EmployeeContext = createContext();

const EmployeeContextProvider = (props) => {

    const [employees, setEmployees] = useState([
        {id: uuidv4(), name: "Ugurcan", email: "ugurcan@hotmail.com", address: "Los Angles America", phone: "111-222-444"},
        {id: uuidv4(), name: "Ümit yasar", email: "ümit@hotmail.com", address: "Istanbul/ Turkey Besiktas", phone: "131-222-444"},
        {id: uuidv4(), name: "Sevgi", email: "sevgi@hotmail.com", address: "Bursa/ Turkey Görükle", phone: "411-224-444"},
        {id: uuidv4(), name: "Ali", email: "ali@hotmail.com", address: "Mardin/ Turkey Görükle", phone: "211-222-844"},
        {id: uuidv4(), name: "Esra", email: "esra@hotmail.com", address: "Ankara/ Turkey Gölbaşı", phone: "121-362-444"},
        {id: uuidv4(), name: "Mahmut", email: "mahmut@hotmail.com", address: "Bursa/ Turkey Görükle", phone: "521-222-444"},
        {id: uuidv4(), name: "Safinaz", email: "safinaz@hotmail.com", address: "Bursa/ Nilüfer Beşevler", phone: "961-272-344"},
    ])
    
    // localeStorage veri alma
    useEffect(() => {
        const employees = localStorage.getItem('employees')
        // localeStorageden aldığımız employees leri değişikleri ile beraber kaydedeceğiz
        setEmployees(JSON.parse(employees))
    }, [])

    // localStorage kullanımı
    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees))
    })

    // isimleri küçükten büyüğe sıraladık alfbetik olarak
    const sortedEmployees = employees.sort((a,b) => a.name.localeCompare(b.name))

    // kullanacağımız yerde 4 parametre alıcaz ve bu parametreler yeni bilgimiz olacak
    const addEmployee = (name, email, address, phone) => {
        setEmployees([...employees, {id: uuidv4(), name, email, address, phone}])
    }

    // kişi silmek için
    const deleteEmployee = (id) => {
        setEmployees(employees.filter(employee => employee.id !== id))
        
    }

    // güncelleme yapmak (edit personel)
    const updateEmployee = (id, updatedEmployee) => {
        // ilk basta map edip değişikliğin olduğu ıd yi bulucaz
        setEmployees(employees.map((employee) => (employee.id === id ? updatedEmployee : employee)))
        
    }

    return(
        <EmployeeContext.Provider value={{sortedEmployees, addEmployee, deleteEmployee, updateEmployee}}>
            {props.children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeContextProvider