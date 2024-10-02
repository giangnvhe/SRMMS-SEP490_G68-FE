import "./admin.scss"
import "../index.scss"
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export const Admin = () => {
    return <div className="table-wrapper">
        <table className="table">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th className="expan">Full Name</th>
                    <th className="expan">Gmail</th>
                    <th className="expan">Date of birth</th>
                    <th className="expan">Role</th>
                    <th>Status</th>
                    <th>Action</th>

                </tr>

            </thead>
            <tbody>
                <tr>
                    <td>01</td>
                    <td className="full-name">Nguyễn Việt Hà</td>
                    <td>Ha@gmail.com</td>
                    <td>28/09/2002</td>
                    <td>Admin</td>
                    <td><span className="lable lable-live">Active</span></td>
                    <td>
                        <span className="actions">
                            <BsFillTrashFill className="delete-btn"/>   
                            <BsFillPencilFill />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>02</td>
                    <td className="full-name">Nguyễn Hoàng Khánh</td>
                    <td>Khanh@gmail.com</td>
                    <td>28/09/2002</td>
                    <td>Admin</td>
                    <td><span className="lable lable-draf">inActive</span></td>
                    <td>
                        <span className="actions">
                            <BsFillTrashFill className="delete-btn"/>   
                            <BsFillPencilFill />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>03</td>
                    <td className="full-name">Nguyễn Văn Giang</td>
                    <td>Giang@gmail.com</td>
                    <td>28/09/2002</td>
                    <td>Admin</td>
                    <td><span className="lable lable-error">Active</span></td>
                    <td>
                        <span className="actions">
                            <BsFillTrashFill  className="delete-btn"/>   
                            <BsFillPencilFill />
                        </span>
                    </td>
                </tr>

            </tbody>
        </table>

    </div>
        ;
};
export default Admin;