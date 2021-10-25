export default function ({ store, redirect }) {
    if (store.state.isLogin === true) {
      return redirect('/login')
    }
  }