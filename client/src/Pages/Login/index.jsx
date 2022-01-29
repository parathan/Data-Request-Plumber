import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

const Login = (props) => {
    return (
        <div>
            <div className={styles.header} >
                <h1>Welcome to DR Plumber</h1>
                <p>Used for data requests</p>
            </div>
            <form>
                <div className={styles.formInput}>
                    <label>Username: </label>
                    <input type="text" />
                </div>
                <div className={styles.formInput}>
                    <label>Password: </label>
                    <input type="password" />
                </div>
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default Login;