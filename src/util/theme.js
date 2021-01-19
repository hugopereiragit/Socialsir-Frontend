export default {
    palette: {
      primary: {
        main: '#283593',
        light: '#33c9dc',
      dark: '#008394',
      contrastText: '#fff'
      },
      secondary: {
        main: '#4fc3f7',
        light: '#ff6333',
        dark: '#b22a00',
        contrastText: '#fff'
      },
    },
    typography: {
      useNextVariants: true
    },
    form: {
      textAlign: 'Center'
  },
  pageTitle: {
      margin:'10px auto 10px auto'
  },
  textField: {
      margin:'10px auto 10px auto'
  },
  button: {
      marginTop: 20,
      position: 'relative' //para darmos absolute ao loading para ficar no meio
  },
  customError:{
      color: 'red' // custom error recusa-se a aparacer TODO EM BAIXO
  },
  loading:{
      position:'absolute'
  }
}