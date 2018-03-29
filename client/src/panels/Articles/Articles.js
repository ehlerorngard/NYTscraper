import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import "./Articles.css";

class Articles extends Component {
  state = {
    scraped_articles: [],
    saved_articles: [],
    heading: "",
    body: ""
  };

  componentDidMount() {
    this.scrapeNYT();
    this.loadSavedArticles();
  }

  scrapeNYT = () => {
    API.scrape()
      .then(res => {
        console.log("res = ", res);
        this.setState({ scraped_articles: res.data, heading: "", body: "" });
        console.log("this.state.scraped_articles = ", this.state.scraped_articles);
      })
      .catch(err => console.log(err));
  };

  loadSavedArticles = () => {
    API.getArticles()
      .then(res => {
        this.setState({ saved_articles: res.data, heading: "", body: "" });
        console.log("this.state.saved_articles = ", this.state.saved_articles);
      })
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    console.log("id to be deleted: ", id);
    API.deleteArticle(id)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  saveArticle = arta => {
      console.log("saveArticle function triggered");
      console.log('arta = ', arta);
      API.saveArticle(arta)
        .then(res => this.loadSavedArticles())
        .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <div>Saved Articles</div>
            </Jumbotron>
            {this.state.saved_articles.length ? (
              <List>
                {this.state.saved_articles.map(article => (
                  <ListItem key={article._id}>
                    <div className="article_row">
                      <strong>
                        {article.title} 
                      </strong><br/>
                        {article.link}
                    </div>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No articles have been saved!</h3>
            )}
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <div>New York Times Articles</div>
            </Jumbotron>
            {this.state.scraped_articles.length ? (
              <List>
                {this.state.scraped_articles.map(article => (
                  <ListItem key={article._id}>
                    <div className="article_row">
                      <strong>
                        {article.title} 
                      </strong><br/>
                        {article.link}
                    </div>
                    <SaveBtn onClick={() => this.saveArticle({ 
                      title: article.title,
                      link: article.link,
                      date: article.date
                    }) } />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
