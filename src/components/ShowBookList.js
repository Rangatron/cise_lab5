import React, { useState,Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    {field: 'author', headerName: 'Author', width: 200},
    {field: 'title', headerName: 'Title' , width: 250},
    {field: 'journal', headerName: 'Journal', width: 150},
    {field: 'year', headerName: 'Year'},
    {field: 'eprint', headerName: 'Eprint'},
    {field: 'eprintType', headerName: 'EprintType'},
    {field: 'eprintClass', headerName: 'EprintClass'},
    {field: 'pages', headerName: 'Pages'},
    {field: 'month', headerName: 'Month'},
    {field: 'annote', headerName: 'Annote'},
];



class ShowBookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      rows: []
    };
  

  }
   
  
  componentDidMount() {
    axios
      .get('http://localhost:8082/api/articles')
      .then(res => {
        this.setState({
          articles: res.data,
        })
      })
      .catch(err =>{
        console.log('Error from ShowBookList');
      })
  };


  render() {
    const articles = this.state.articles;
    console.log("PrintBook: " + articles);
    let bookList;

    if(!articles) {
      bookList = "there is no book record!";
    } /*else {
      bookList = books.map((book, k) =>
        <BookCard book={book} key={k} />
      );
    }*/

    return (
      <div className="ShowBookList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Article List</h2>
            </div>

            <div className="col-md-11">
              <Link to="/AddArticle" className="btn btn-outline-warning float-right">
                + Add Article
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>

          <div style={{ height: 400, width: '100%' }}>
         <DataGrid rows={this.state.articles} getRowId={(row) => row._id} columns={columns} pageSize={10}/>
         </div>
        </div>
      </div>
    );
  }
}

export default ShowBookList;