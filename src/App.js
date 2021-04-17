import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

const observable = Observable.create(function(observer) {
  observer.next('Hello')
});

function App() {
  const [items, setItem] = useState([])
  
  useEffect(() => {
    var subscription = observable.subscribe((value) => {
      console.log(value);
      setItem( items => [...items, value])
    })
    return () => {
      subscription.unsubscribe();
    } 
  },[]);

  

  return (
    <div>
      {items.map( item => <li>{item}</li>)}
    </div>
  )
}

export default App;
