import React, { useEffect } from 'react';
import useProdSupStore from '../../../stores/prodsupplierStore';
import InvSideBarForSup from '../../../components/InventoryComponents/InvSideBarForSup'
import InvSupNav from '../../../components/InventoryComponents/invSupNav';

const SupDash = () => {
    const { prodsupList, error, fetchAllProdsup } = useProdSupStore();

    useEffect(() => {
        fetchAllProdsup();
    }, [fetchAllProdsup]);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 sidenav">
                        <InvSideBarForSup />
                    </div>
                    
                    <div className="col-sm-10">
                        <InvSupNav />
                        <h1>Suppliers</h1>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>SupId</th>
                                        <th>Name</th>
                                        <th>Contact No</th>
                                        <th>Email</th>
                                        <th>Contact App Name</th>
                                        <th>Status</th>
                                        <th>Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prodsupList.length > 0 ? (
                                        prodsupList.map(item => (
                                            <tr key={item._id}>
                                                <td>{item.SupId}</td>
                                                <td>{item.supname}</td>
                                                <td>{item.Contactno}</td>
                                                <td>{item.email}</td>
                                                <td>{item.contsappname}</td>
                                                <td>{item.supstatus}</td>
                                                <td>{item.note}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7">No product suppliers found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SupDash;
