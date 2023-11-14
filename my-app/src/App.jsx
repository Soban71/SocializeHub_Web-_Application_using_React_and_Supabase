import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import {Routes , Route} from "react-router-dom";
import NewPosts from "./Components/Newpost/Newpost";
import PostDetail from "./Components/Newpost/PostDetail";
import UpdatePost from "./Components/Newpost/UpdatePost";


function App() {
  return (
    <div >
      <Navbar></Navbar>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/NewPost" element={<NewPosts/>}/>
      <Route path="/postDetail/:id" element={<PostDetail/>}/>
      <Route path="/updatePost/:id" element={<UpdatePost/>} />

      </Routes>
    </div>
  );
}

export default App;




//name Webs_App
//db passoword sachalarka123
//name Web_Application
//db passoword sachalarka1234