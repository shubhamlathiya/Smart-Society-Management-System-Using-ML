import React, {useState} from "react";

function LoginFrom({onSelectRole}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit() {
        console.log(email);
        console.log(password);

    }

    return (<>
        <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" onChange={handleEmail} className="form-control" id="exampleInputEmail1"
                       aria-describedby="emailHelp"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                    else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" onChange={handlePassword} className="form-control"
                       id="exampleInputPassword1"/>
            </div>
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
             <div style={{textAlign: "center", marginTop: "50px"}}>
                 <h2>Select Role</h2>
                 <button onClick={() => onSelectRole("resident")} style={{margin: "10px"}}>
                     Resident
                 </button>
                 <button onClick={() => onSelectRole("admin")} style={{margin: "10px"}}>
                     Admin
                 </button>
             </div>
        </form>
    </>)
}

export default LoginFrom;