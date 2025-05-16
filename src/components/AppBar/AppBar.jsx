import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { checkAuthState } from "../../redux/auth/operations";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";


export default function AppBar() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    useEffect(() => {
        dispatch(checkAuthState())
    }, [dispatch]);
    
    return (
        <div>
            {isLoggedIn ? <UserMenu /> : <AuthNav/>}
        </div>
    )
}
