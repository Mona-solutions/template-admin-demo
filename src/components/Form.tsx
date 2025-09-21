export default function Form() {
  return (
    <div>
      <form className="form">
        <div className="formDiv">
          <label>Username</label>
          <input type="text"></input>
        </div>
        <div className="formDiv">
          <label>Password</label>
          <input type="password"></input>
        </div>
        <div className="formDiv">
          <label>Email</label>
          <input type="email"></input>
        </div>
        <div className="formDivButton">
          <button className="formButton">Register</button>
        </div>
      </form>
    </div>
  );
}
