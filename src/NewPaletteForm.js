import React, {Component } from 'react';
// import {Link} from 'react-router-dom'

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {ChromePicker} from 'react-color'
import Button from '@material-ui/core/Button';
// import DraggableColorBox from './draggableColorBox'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
// import { blue } from '@material-ui/core/colors';
import DraggableColorList from './DraggableColorList'
import arrayMove from 'array-move';
import PaletteFormNav from './PaletteFormNav'
import ColorPickerForm from './colorPickerForm'


const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors : 20
  }

  constructor(props){
    super(props);
      this.state = {
        open: true,
        currentColor: "teal",
        colors: this.props.palette[0].colors,
        newColorName: "",
        newPaletteName: ""
    };
  // this.updateCurrentColor = this.updateCurrentColor.bind(this)
  this.addNewColor = this.addNewColor.bind(this)
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  this.deleteColor = this.deleteColor.bind(this)
  this.clearColors = this.clearColors.bind(this)
  this.addRandomColor = this.addRandomColor.bind(this)
  }


  addRandomColor(){
    const allColors = this.props.palette.map(p => p.colors).flat()
    let rand = Math.floor(Math.random() * allColors.length)
    let randomColor = allColors[rand]
    // console.log(randomColor)
    this.setState({colors: [...this.state.colors, randomColor]})
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }))
  };
  
  clearColors(){
    this.setState({colors: []})
  }

  // componentDidMount() {
    
  //   ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
  //     let obj = this.state.colors.find( object => object.name.toLowerCase() === value.toLowerCase())
  //     return (!obj?  true:  false)
  //   })

  //   ValidatorForm.addValidationRule('isColorUnique', (value) => {
  //     let obj = this.state.colors.find( object => object.color.toLowerCase() === this.state.currentColor.toLowerCase())
  //     return (!obj?  true:  false)
  //   })

  //   // ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
  //   //   let obj = this.props.palette.find( palette => palette.id.toLowerCase() === this.state.newPaletteName.toLowerCase())
  //   //   return (!obj?  true:  false)
  //   // })

  // }

// ==========================
// handle Change on forms
// ==========================

  handleChange(evt){
    
    this.setState({ [evt.target.name]: evt.target.value})
    
  }
// ==========================
  // ColorPicker
// ==========================
  addNewColor(newColorObject){
    this.setState({colors: [...this.state.colors, newColorObject], newColorName: ""})
  }


  // updateCurrentColor(newColor){
  //   this.setState({currentColor: newColor.hex})
  // }

  handleSubmit(newPaletteName){
    const newPallete = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      emoji: "",
      colors: this.state.colors
    }
    this.props.savePalette(newPallete)
    this.props.history.push("/")
  }

  deleteColor(colorName){
    this.setState(
      {colors: this.state.colors.filter( color => color.name !== colorName)}
    )

  }
// ==========================
// Drawer
// ==========================

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

 
  
 



  render() {
    const { classes, theme, palette } = this.props;
    const { open , currentColor, colors} = this.state;
    const paletteIsFull = this.state.colors.length >= this.props.maxColors

    return (
      <div className={classes.root}>
        
        <PaletteFormNav 
          classes={classes} 
          open={open} 
          handleSubmit={this.handleSubmit} 
          palette={palette}
          handleDrawerOpen = {this.handleDrawerOpen}/>









        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
        
        
          <div className={classes.drawerHeader}>
          This is the header of the Menu
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon /> 
            </IconButton>
          </div>
          <Divider />
          This is the top part of the menu
          <Divider />
          <Typography variant="h4">Design Your Palette</Typography>
          <div>
            <Button variant="contained" color="secondary" onClick={this.clearColors}> Clear Palette </Button>
            <Button variant="contained" color="primary" onClick={this.addRandomColor} disabled= {paletteIsFull}> Random Color </Button>
          </div>



            <ColorPickerForm 
              paletteIsFull = {paletteIsFull}
              currentColor = {currentColor}
              addNewColor = {this.addNewColor}
              updateCurrentColor= {this.updateCurrentColor}
              colors = {colors}/>
          
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

            <DraggableColorList 
              colors={this.state.colors}
              deleteColor = {this.deleteColor}
              axis = "xy"
              onSortEnd = {this.onSortEnd}
            />
            
          
          
        </main>
      </div>
    );
  }
}

// PersistentDrawerLeft.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };





  export default withStyles(styles, { withTheme: true })(NewPaletteForm)