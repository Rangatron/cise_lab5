import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    {field: '_id', headerName: 'ID'},
    {field: 'Author', headerName: 'Author'},
    {field: 'Title', headerName: 'Title'},
    {field: 'Journal', headerName: 'Journal'},
    {field: 'Year', headerName: 'Year'},
    {field: 'Eprint', headerName: 'Eprint'},
    {field: 'EprintType', headerName: 'EprintType'},
    {field: 'EprintClass', headerName: 'EprintClass'},
    {field: 'Pages', headerName: 'Pages'},
    {field: 'Month', headerName: 'Month'},
    {field: 'Annote', headerName: 'Annote'},
    {field: '__v', headerName: 'Version'},

];



class ShowBookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }
  
  
  componentDidMount() {
    axios
      .get('http://localhost:8082/api/articles')
      .then(res => {
        this.setState({
          articles: res.data
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
         <DataGrid rows={this.state.articles} getRowId={(row) => row._id} columns={columns} pageSize={5} checkboxSelection />
         </div>
        </div>
      </div>
    );
  }
}

export default ShowBookList;