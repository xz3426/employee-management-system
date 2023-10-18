import { MailOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AuthForm from 'Components/AuthForm';
import { authUser } from 'app/userSlice';
import { Layout, message} from "antd";

export default function SignIn() {
  const { Content } = Layout;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const signInStatus = useSelector((state) => state.user.status);
  const user = useSelector((state) => state.user.user);
  const signInError = useSelector((state) => state.error.message);  
  
  useEffect(()=>{
    if (signInStatus === 'succeeded') {
      message.success("Sign in successfully");
      if (user.authorization === "hr"){
        navigate('/hr');
      }else if (user.authorization === "regular"){
        navigate('/employee');
      }
      
    } else if (signInStatus === 'failed'){
      message.error(signInError);
    }
  }, [signInStatus]);
  
  const fields = [
    {
      placeholder: 'Email',
      name: 'email',
      type: 'text',
      prefix: <MailOutlined />
    },
    {
      placeholder: 'Password',
      name: 'password',
      type: 'password'
    }
  ];

  const onSubmit = data => {
    console.log(data);
    dispatch(authUser(data))
  };

  return (
    <Content
    style={{
      padding: "0 50px",
      minHeight: "100vh",
      backgroundColor: "lightgrey",
      display: "flex", // Add display flex
        // alignItems: "center", // Center vertically
        justifyContent: "center", // Center horizontally
    }}
    >
    
    <div
        style={{
          width: "700px",
          margin: "150px auto 0", // Add a 200px margin from the top
          padding: "20px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "5px",
          flexDirection: "column",
          height: "420px", 
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
      <AuthForm
        buttonText="Sign In"
        onSubmit={onSubmit}
        title="Sign in to your account"
        fields={fields}
      />
      <div className="form-links">
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link> 
          
          <a href="/changepassword" style={{   float:"right" }}>Forgot Password?</a>
        </p>
      </div>
    </div>
    </Content>
  );
}
