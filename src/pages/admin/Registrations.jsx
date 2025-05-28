import React from "react";
import DataTable from "../../components/DataTable";
import { registrations } from "../../data/mockData";

const Registrations  = () => {
    const columns = [
        { key: 'id', label: "ID"},
        { key: 'type', label: "Type"},
        { key: 'name', label: "Name"},
        { key: 'status', label: "Status"},
    ];

    return(
        <section className="bg-white p-4 rounded">
            <h2 className="text-lg font-bold">Registrations</h2>
            <DataTable data={registrations} columns={columns} />
        </section>
    )
};

export default Registrations;