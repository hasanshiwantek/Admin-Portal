interface Props{

    report:any;

}

export default function ReportSummary({

    report,

}:Props){

    return(

        <div className="grid grid-cols-4 gap-5">

            <div className="bg-white rounded-lg shadow p-5">

                <p>Total Families</p>

                <h2 className="text-3xl font-bold">

                    {report?.families ?? 0}

                </h2>

            </div>

            <div className="bg-white rounded-lg shadow p-5">

                <p>Total Children</p>

                <h2 className="text-3xl font-bold">

                    {report?.children ?? 0}

                </h2>

            </div>

            <div className="bg-white rounded-lg shadow p-5">

                <p>Checked Out</p>

                <h2 className="text-3xl font-bold">

                    {report?.checked_out ?? 0}

                </h2>

            </div>

            <div className="bg-white rounded-lg shadow p-5">

                <p>Currently Inside</p>

                <h2 className="text-3xl font-bold">

                    {report?.currently_inside ?? 0}

                </h2>

            </div>

        </div>

    );

}