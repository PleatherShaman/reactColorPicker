import React, {Component } from 'react';
import './colorBox.css'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {Link} from 'react-router-dom'
import chroma from 'chroma-js'
import {withStyles} from "@material-ui/styles"

const styles = {

    ColorBox: {
        width: "20%",
        height: props => props.showFullPalette? "25%" :"50%" ,
        margin:  "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4.5px",
        "&:hover button": {
            opacity: "1"
           
        }
    
    },

    CopyText: {
        color: props => chroma(props.background).luminance()  >= 0.5? "black" : "white"
    },
    colorName: {
        color: props => chroma(props.background).luminance()  >= 0.5? "black" : "white"
    },

    seeMore:{
        
        background: "rgba(255,255,255,0.3)",
        position: "absolute",
        border: "none",
        right: "0px",
        bottom:"0px",
        color: props => chroma(props.background).luminance()  >= 0.5? "black" : "white",
        width: "60px",
        height: "30px",
        textAlign: "center",
        textTransform: "uppercase"
    },

    copyButton: {
        color: props => chroma(props.background).luminance()  >= 0.5? "black" : "white",
        width: "100px",
        height:"30px",
        position: "absolute",
        display: "inline-block",
        top:"50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255,255,255,0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        textDecoration: "none",
        opacity: "0"
        
        
    }
}


class ColorBox extends Component{

    constructor(props){
        super(props);
        this.state = {
            copied: false
        }
        this.changeCopyState = this.changeCopyState.bind(this);
    }


    changeCopyState(){
        this.setState( {copied:true}, () => {
            setTimeout(() => this.setState({copied:false}), 1500)
        })
    }
    
    render(){
        const {name, background, paletteId, colorId, id, classes, showFullPalette} = this.props
        const copied = this.state.copied
        const isDark = (chroma(background).luminance() <= 0.5)
        


        return(
            <CopyToClipboard text = {background} onCopy={this.changeCopyState}>
                <div className={classes.ColorBox} style={{background}}>
                    <div className={`copy-overlay ${copied && "show"}`} style={{background}} />
                    <div className={`copy-msg ${copied && "show"} ${classes.CopyText}`}>
                        <h1 >Copied!</h1>
                        <p >{background}</p>
                    </div>
                    
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={classes.colorName} >{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>

                    {showFullPalette && (
                    <Link exact to={`/palette/${paletteId}/${colorId}`} onClick={(e => e.stopPropagation())}>
                        <span className={classes.seeMore}>More</span>
                    </Link>
                    )}
                </div>
            </CopyToClipboard>
            
        )
    }

}


export default withStyles(styles)(ColorBox)