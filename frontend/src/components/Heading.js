import {Link} from 'react-router-dom'

function Heading({back,link,buttons,heading}){
    return (
        <div className="container-fluid">
            {
               back && <Link to={link} className="p-3 m-0 text-secondary text-decoration-none">Back</Link>
            }
            <div className='container-fluid d-flex justify-content-between'>
            <h1 className="h1 p-0 m-0">{heading}</h1>
                <div>
                    {
                        buttons?.length>0 && buttons.map(btn=>(
                            <button className='btn btn-outline-primary'>{btn}</button>
                        ))
                    }
                </div>
            </div>
            <hr className="border-3" />
        </div>
    )
}

export default Heading;