import React from 'react';
import Sidebar from '../../components/InventoryComponents/InvSideBar'

const InvProfile = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2 sidenav">
                    <Sidebar />
                </div>
                <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                    <div className="card p-4">
                        <div className="image d-flex flex-column justify-content-center align-items-center">
                            <button className="btn btn-secondary">
                                <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" alt="Profile" />
                            </button>
                            <span className="name mt-3">Eleanor Pena</span>
                            <span className="idd">@eleanorpena</span>
                            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                                <span className="idd1">Oxc4c16a645_b21a</span>
                                <button className="btn btn-light"><i className="bi bi-files"></i></button>
                            </div>
                            <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                                <span className="number">1069 <span className="follow">Followers</span></span>
                            </div>
                            <div className="d-flex mt-2">
                                <button className="btn btn-dark">Edit Profile</button>
                            </div>
                            <div className="text mt-3">
                                <span>Eleanor Pena is a creator of minimalistic x bold graphics and digital artwork.<br /><br /> Artist/ Creative Director by Day #NFT minting@ with FND night. </span>
                            </div>
                            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                                <span><i className="bi bi-twitter"></i></span>
                                <span><i className="bi bi-facebook"></i></span>
                                <span><i className="bi bi-instagram"></i></span>
                                <span><i className="bi bi-linkedin"></i></span>
                            </div>
                            <div className="px-2 rounded mt-4 date">
                                <span className="join">Joined May, 2021</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InvProfile;
