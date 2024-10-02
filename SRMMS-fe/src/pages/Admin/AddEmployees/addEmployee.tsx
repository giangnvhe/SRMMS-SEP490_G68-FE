import "./addEmployees.scss"
import "../index.scss"

export const AddEmployees = () => {
    return <div className="addE-container">
        <div className="addE">
            <form>
                <div className="form-group">
                    <label htmlFor="employeesId">EmployeeID </label>
                    <input name="employeesId" />
                </div>
                <div className="form-group">
                    <label htmlFor="page">Full Name </label>
                    <input id="fullName" name="fullName" />
                </div>
                <div className="form-group">
                    <label htmlFor="gmail">Gmail </label>
                    <input name="gmail" />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role </label>
                    <select name="role">
                        <option value="admin">Admin</option>
                        <option value="marketing">Marketing</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="staff">Staff</option>
                        <option value="manager">Manage</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="page">Date Of Birth </label>
                    <input id="dateOfBirth" name="dateOfBirth" type="date" />
                </div> 
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select name="status">
                        <option value="active">Active</option>
                        <option value="inActive">InActive</option>
                        
                    </select>
                </div>
                <button type="submit" className="btn-submit">Addition</button>

            </form>
        </div>

    </div>;
}   
export default AddEmployees;