import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [allBatches,setAllBatches] = useState([])
  const [allCompanies,setAllCompanies] = useState([]);
  const [currentCompany,setCurrentCompany] = useState(null);
  const [selectedBatch,setSelectedBatch] = useState(null)

  const getAllBatches = async() => {
    try{
      const res = await fetch("http://localhost:5500/batches")
      setAllBatches(await res.json())
    }catch(error){
      console.log(error)
    }
  }

  const getAllCompanies = async() => {
    try{
      const res = await fetch("http://localhost:5500/companyDetails")
      const json = await res.json()
      console.log(json)
      setAllCompanies(json)
    }catch(error){
      console.log(error)
    }
  }

  const getCompanyById = async(id) => {
    try{
      const res = await fetch(`http://localhost:5500/companyDetails/?&_id=${id}`)
      const json = await res.json()
      if(json.length>0){
        setCurrentCompany(json[0])
        return
      }
      setCurrentCompany([])
    }catch(error){
      console.log(error)
    }
  }

  const getBatchById = async(id) => {
    try{
      const res = await fetch(`http://localhost:5500/batches/?&_id=${id}`)
      const json = await res.json()
      console.log(json, id)
      if(json.length>0){
        setSelectedBatch(json[0])
        return
      }
      setSelectedBatch(null)
    }catch(error){
      console.log(error)
    }
  }

  const updateStudentStatusForCompanyById = () => {

  }

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, getAllBatches, allBatches, getAllCompanies, allCompanies, currentCompany, getCompanyById, updateStudentStatusForCompanyById, selectedBatch, getBatchById }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
