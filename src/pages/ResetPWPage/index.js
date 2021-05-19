import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {auth} from "../../fbase";
import { makeStyles } from "@material-ui/core/styles";


const ResetPWPage = () => {

    const [email, setEmail] = useState("");
    const classes = useStyles();

    function SendEmail(){
        auth.sendPasswordResetEmail(email).then(function() {
            alert("이메일 전송 완료");
        }).catch(function(error) {
            alert("이메일 전송 실패");
        });
    }
    


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <h1>Reset PW</h1>
            <p>
                이메일 주소를 입력하면 비밀번호를 변경할 수 있는 이메일을 발송합니다.
                기존의 비밀번호를 찾는것은 불가합니다. 
            </p>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => {SendEmail()}}
            >메일 전송</Button>
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export default ResetPWPage;