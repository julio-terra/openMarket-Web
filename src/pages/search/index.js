import Button from '../../components/button';
import { useState, useEffect } from 'react';
import Product from '../../components/product';
import api from '../../services/axios';

import './styles.css';

const Search = () =>{
  const [tags, setTags] = useState('');
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState();
  const [productData, setProductData] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [itensPerPage, setItensPerPage] = useState(5);
	const [totalItens, setTotalItens] = useState(0);
  const [newSearch, setNewSearch] = useState(false);


  const handleSubmit = async event =>{
    event?.preventDefault();
    setLoading(true)
    window.scrollTo(0,0)
    if(newSearch){
      setCurrentPage(0)
    }
    setActive(true)

    const response = await api.post(
      `/products/search?page=${currentPage}&itensPerPage=${itensPerPage}`,
      {tags: tags.toLowerCase().split(" ")}
    )
    setProductData(response?.data?.products);
    setTotalItens(response?.data?.totalCount?.length);
    setNewSearch(false)
    setLoading(false)
  }
  const pages = Math.ceil(totalItens / itensPerPage);
  

  const goToPage = (page) => {
		setCurrentPage(page);
	}
  useEffect(() =>{
    if(tags.length){
      handleSubmit()
    }
  }, [currentPage])
  useEffect(() =>{
    setNewSearch(true)
  }, [tags])

  return(
    <>
      <div className={`search-container bg-secondary d-flex align-items-center ${active? "active" : "desActive"}`}>
        <div className="container">
          <form onSubmit={handleSubmit} className="d-flex">
            <div className="col-10">
              <input
                type="search" 
                className="form form-control form-control-lg" 
                placeholder="search"
                onChange={e => setTags(e.target.value)}
              />
            </div>
            <div className="button-wrapper col-2">
              <Button className="btn btn-dark w-100" type="submit" loading={loading} setLoading={setLoading}>
                <span className="mdi mdi-magnify" />
              </Button>
            </div>
          </form>
        </div>
      </div>
        {
          active && !productData?.length && (
            <div className="search-result bg-secondary d-flex align-items-center justify-content-center">
              {
                loading? <span className="spinner-border spinner-border-sm" /> : <h1>No Result Found</h1>
              }
            </div>
          )
        }
        {
          active  && productData?.length && (
            <div className="search-result bg-secondary d-flex align-items-center justify-content-center flex-column">
              <div className="container products d-flex flex-wrap">
                {
                  productData.map(e =>(
                      <div className="col-3 p-1">
                        <div className="w-100">
                          <Product product={e} />
                        </div>
                      </div>
                  ))
                }
              </div>
              <nav aria-label="...">
                <ul className="pagination mt-5 mb-3">
                  {
                    currentPage !== 0 && (
                      <li className="page-item">
                        <button className="page-link" onClick={() => goToPage(currentPage - 1)}>Previous</button>
                      </li>
                    )
                  }
                  {
                    currentPage > 1 && (
                      <li className="page-item">
                        <button className="page-link" onClick={() => goToPage(currentPage - 2)}>{currentPage - 1}</button>
                      </li>
                    )
                  }
                  {
                    currentPage !== 0 && (
                      <li className="page-item">
                        <button className="page-link" onClick={() => goToPage(currentPage - 1)}>{currentPage}</button>
                      </li>
                    )
                  }
                  <li className="page-item active">
                    <button className="page-link">{currentPage + 1}</button>
                  </li>
                  {
                    currentPage !== ( pages - 1 ) && (
                      <li className="page-item">
                        <button onClick={() => goToPage(currentPage + 1)} className="page-link">{currentPage + 2}</button>
                      </li>
                    )
                  }
                  {
                    currentPage < (pages - 2) && (
                      <li className="page-item">
                        <button onClick={() => goToPage(currentPage + 2)} className="page-link">{currentPage + 3}</button>
                      </li>
                    )
                  }
                  {
                    currentPage !== ( pages - 1 ) &&(
                      <li className="page-item">
                        <button onClick={() => goToPage(currentPage + 1)} className="page-link">Next</button>
                      </li>
                    )
                  }
                </ul>
              </nav>
            </div>
          )
        }
    </>
  );
};
export default Search;