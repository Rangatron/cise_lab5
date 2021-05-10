import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    {field: 'Author', headerName: 'Author'},
    {field: 'Title', headername: 'Title'},
    {field: 'Journal', headerNamer: 'Journal'},
    {field: 'Year', headerNamer: 'Year'},
    {field: 'Eprint', headerNamer: 'Eprint'},
    {field: 'EprintType', headerNamer: 'EprintType'},
    {field: 'EprintClass', headerNamer: 'EprintClass'},
    {field: 'Pages', headerNamer: 'Pages'},
    {field: 'Month', headerNamer: 'Month'},
    {field: 'Annote', headerNamer: 'Annote'},

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

    if(!books) {
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

          <div className="list">
          <DataGrid rows={this.state.articles} columns={columns} pageSize={5} checkboxSelection />
          </div>
        </div>
      </div>
    );
  }
}

export default ShowBookList;