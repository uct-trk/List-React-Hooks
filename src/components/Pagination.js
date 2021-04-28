import { useEffect, useState } from "react"
import { Badge } from "react-bootstrap"

const Pagination = ({pages, setCurrentPage, currentEmployees, sortedEmployees}) => {


    const numOfPages = []

    for (let i = 1; i <= pages; i++) {
        numOfPages.push(i)
    }

    const [currentButton, setCurrentButton] = useState(1)

    useEffect(() => {
        setCurrentPage(currentButton)
    }, [currentButton, setCurrentPage])

    return (
        <div className="clearfix">
            <Badge variant="success" pill>Total Person: {sortedEmployees.length}</Badge> 
            <Badge variant="info" className="ml-3" pill>Showing Person: {currentEmployees.length}</Badge> 
            <ul className="pagination">
                <li className={`${currentButton === 1 ? 'page-item disabled' : 'page-item'}`}><a href="#!"
                    onClick={() => setCurrentButton((prev) => prev === 1 ? prev : prev - 1)}>Previous</a></li>
                {
                    numOfPages.map((page, index) => {
                        return (
                            <li key={index} className={`${currentButton === page ? 'page-item active' : 'page-item'}`}><a href="#" className="page-link"
                                onClick={() => setCurrentButton(page)}
                            >{page}</a></li>
                        )
                    })
                }
                <li className={`${currentButton === numOfPages.length ? 'page-item disabled' : 'page-item'}`}><a href="#!"
                    onClick={() => setCurrentButton((prev) => prev === numOfPages.length ? prev : prev + 1)}>Next</a></li>
            </ul>
        </div>
    )
}
export default Pagination