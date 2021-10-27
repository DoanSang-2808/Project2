export default function ({ store, redirect, $cookies }) {
  store.dispatch("handleChangeBgImg", true);
  if($cookies.get("Account") !== undefined){
    if ($cookies.get("Account").role === 'guest') {
      return redirect('/home')
    } else {
      return redirect('/admin')
    }
  }
}
