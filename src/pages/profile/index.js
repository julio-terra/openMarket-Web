import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { useAlert } from '../../hooks/alert';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

import PerfectScrollbar from 'react-perfect-scrollbar'
import Button from '../../components/button';
import ReactTags from '../../components/reactTags';

import api from '../../services/axios';

import './styles.css';

const  Profile = ()  =>{
  useEffect(() =>{
    alert('this page is far from finished')
  }, [])
  
  const { user } = useAuth();
  const { triggerAlert } = useAlert();
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(0)
  const [tags, setTags] = useState([{name: user?.name}]);
  useEffect(() => {
    const fetchData = async () =>{
      const response = await api.get(`/products/${user._id}`)
      setProducts(response.data.products);
    }
    fetchData()
  }, [update])
  const onSubmit = async data =>{
    setLoading(true)
    var formData = new FormData();
    formData.append('file', data.file[0]);
    formData.append('name', data.name)
    formData.append('price', data.price)
    formData.append('category', data.category)
    formData.append('tags', JSON.stringify(tags.map(e => e.name.toLowerCase())))
    formData.append('user_id', user._id)
    
    await api.post("/product", formData, {"Content-Type": "multipart/form-data"}).then(() =>{
      setUpdate(update + 1)
      triggerAlert('your product has been put up for sale!');
    }).catch(() =>{
      triggerAlert('an unexpected error occurred');
    });
    setLoading(false)
  }
  return (
    <div className="profile bg-secondary">
      <div className="container">
        <section className="d-flex">
          <h1>{user?.name}</h1>
        </section>
        <section className="col-12 mt-5">
          <h3 className="text-dark">My products</h3>
          <div className="products-wrapper bg-dark text-white rounded p-1">
            <div className="col-12 d-flex header py-2 mb-2">
              <div className="col-2 col-md-1">

              </div>
              <div className="col-4 col-md-5 col-lg-8">
                <h5>name</h5>
              </div>
              <div className="col-3 col-lg-2">
                <h5>Category</h5>
              </div>
              <div className="col-3 col-lg-1 ps-3 ps-sm-0">
                <h5>Action</h5>
              </div>
            </div>
            <PerfectScrollbar className="products px-1">
              {
                products?.map(e =>(
                  <Link to={`/product/${e._id}`} className="d-flex align-items-center py-1 text-white" key={e._id} onClick={() => window.scrollTo(0,0)}>
                    <div className="img col-2 col-md-1">
                      <img
                        src={e.fileUrl}
                        alt=""
                        className="rounded bg-white"
                      />
                    </div>
                    <div className="col-4 col-md-5 col-lg-8 pe-3">
                      <span>{e.name}</span>
                    </div>
                    <div className="col-3 col-lg-2">
                      <span>{e.category}</span>
                    </div>
                    <div className="col-3 col-lg-1 ps-3 ps-sm-0">
                      <span className="">Delete</span>
                    </div>
                  </Link>
                ))
              }
            </PerfectScrollbar>
          </div>
        </section>
        <form className="col-12 col-lg-6 offset-lg-6 mt-5 py-5 text-dark rounded" onSubmit={handleSubmit(onSubmit)}>
          <h3>Sell new product</h3>
          <div className="d-flex">
            <div className="col-9 mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                id="name"
                {...register("name")}
                required
              />
            </div>
            <div className="col-3 mt-2 ps-2">
              <input
                type="number"
                min="1"
                max="100000"
                step="1"
                className="form-control"
                placeholder="Price"
                {...register("price")}
                required
              />
            </div>
          </div>
          <div className='mt-2'>
            <select className="form-select" {...register("category")}>
              <option selected value="Smartphones">Smartphones</option>
              <option value="Tablets">Tablets</option>
              <option value="Notebooks">Notebooks</option>
              <option value="Sneakers">Sneakers</option>
              <option value="Shirts">Shirts</option>
              <option value="Pants">Pants</option>
            </select>
          </div>
          <div className="col-12 mt-2">
            <ReactTags
              tags={tags}
              setTags={setTags}
            />
          </div>
          <div className="mt-2">
            <input
              type="file"
              className="input-img"
              name="file"
              id="file"
              accept=".jpg, .jpeg, .png"
              {...register("file")}
              required
            />
          </div>
          <div>
            <Button loading={loading} className="btn btn-dark w-100 mt-2" type="submit">
              Sell
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Profile;