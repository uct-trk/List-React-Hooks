import {EmployeeContext} from '../context/EmployeeContext'
import {Form, Button} from 'react-bootstrap'
import { useContext, useState } from 'react'

const EditForm = ({theEmployee}) => {

    const { updateEmployee } = useContext(EmployeeContext)

    const employee = theEmployee
    const id = employee.id

    const [name, setName] = useState(employee.name)
    const [email, setEmail] = useState(employee.email)
    const [address, setAddress] = useState(employee.address)
    const [phone, setPhone] = useState(employee.phone)

    const updatedEmployee = {id, name, email, address, phone}

    const handleSubmit = (e) => {
        e.preventDefault();
        updateEmployee(id, updatedEmployee)
    }
   
    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control 
                    type="text"
                    placeholder="Name *"
                    value={name}
                    onChange={(e) =>setName(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Control 
                    type="email"
                    placeholder="Email *"
                    value={email}
                    onChange={(e) =>setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Control 
                    as="textarea"
                    placeholder="Address"
                    value={address}
                    onChange={(e) =>setAddress(e.target.value)}
                    rows={3}
                />
            </Form.Group>

            <Form.Group>
                <Form.Control 
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) =>setPhone(e.target.value)}
                />
            </Form.Group>

            <Button className="w-100" variant="success" type="submit">
                EDİT INFO
            </Button>
        </Form>
    )
}
export default EditForm