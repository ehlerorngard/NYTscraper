import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    scraped_articles: [],
    saved_articles: [],
    heading: "",
    body: ""
  };

  componentDidMount() {
    this.scrapeNYT();
    this.loadSavedArticles
  }

  scrapeNYT = () => {
    API.scrape()
      .then(res =>
        this.setState({ scraped_articles: res.data, heading: "", body: "" });
        console.log("this.state.scraped_articles = ", this.state.scraped_articles);
      )
      .catch(err => console.log(err));
  };

  loadSavedArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ saved_articles: res.data, heading: "", body: "" });
        console.log("this.state.saved_articles = ", this.state.saved_articles);
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  saveArticle = arta => {
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
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <div>
                      <strong>
                        {article.title} 
                      </strong>
                        {article.link}
                    </div>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>New York Times Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <div>
                      <strong>
                        {article.title} 
                      </strong>
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
