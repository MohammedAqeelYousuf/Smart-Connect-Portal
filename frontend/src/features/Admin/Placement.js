import Heading from '../../components/Heading'
import Table from '../../components/Table'

const mockData = [
    {
        "batch":2025,
        "enrolled":80,
        "placed":40
    },
    {
        "batch":2025,
        "enrolled":80,
        "placed":40
    },
    {
        "batch":2025,
        "enrolled":80,
        "placed":40
    },
    {
        "batch":2025,
        "enrolled":80,
        "placed":40
    },
]

function Placement(){
    return (
        <div className="container-fluid p-2 vh-100">
            <Heading back={false} heading={"Placement Data"} />
            <div className="p-2">
                <div className="container-fluid d-flex justify-content-between">
                    <h4 className="h4 p-0">Batches</h4>
                    <div className="d-flex gap-2">
                        <form role="search">
                            <input class="form-control" type="search" placeholder="Enter Batch Year" aria-label="Enter Batch Year"/>
                        </form>
                        <button className="btn bg-primary text-white">Add +</button>
                    </div>
                </div>
                <Table columns={["Batch Name","Students Enrolled"," Students PLaced"]} actions={true} data={mockData} />
            </div>
            <div className="p-2">
                <div className="container-fluid d-flex justify-content-between">
                    <h4 className="h4 p-0">Companies</h4>
                    <div className="d-flex gap-2">
                        <form role="search">
                            <input class="form-control" type="search" placeholder="Enter Batch Year" aria-label="Enter Batch Year"/>
                        </form>
                        <button className="btn bg-primary text-white">Add +</button>
                    </div>
                </div>
                <Table columns={["Company Name","Last Reg. Date","Date","Batch"]} actions={true} data={mockData} />
            </div>
        </div>
    )
}

export default Placement;