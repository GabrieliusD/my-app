import React from 'react'
import PropTypes from 'prop-types';
import Button from "./Button";
const Header = ({title}) =>{
    const onClick = () =>
    {
        console.log("hi")
    }
    return(
        <header className="header">
            <h1>Task Tracker</h1>
            <Button color="green" text ="Add" onClick = {onClick}></Button>
        </header>
    )

    
}
Header.defaultProps = {
    title: "I Lolled"
}

Header.propTypes = 
{
    title: PropTypes.string,
}

const HeadingStyle = {
    color: 'Red',
    backgroundColor: "blue"
}

export default Header