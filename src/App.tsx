import { Main } from "./components/Main/Main"
import  './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AboutUser } from "./components/AboutUser/AboutUser"

export const App = () => {
	return (
		<BrowserRouter> 
			<div className='content'>
				<Routes>
                    <Route path='/' element={<Main/>}/>
					<Route path='/aboutUser' element={<AboutUser/>}/>
                </Routes>
			</div>
        </BrowserRouter>
	)
}

