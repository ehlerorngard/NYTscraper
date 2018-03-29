import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import "./Articles.css";

class Articles extends Component {
  state = {
    saved_articles: [],
    api_search_results: [],
    begin_date: "",
    end_date: "",
    topic_sought: "",
    heading: "",
    body: ""
  };

  componentDidMount() {
    this.loadSavedArticles();
  }

  searchNYT = () => {
    let query = this.state.topic_sought
        + "&begin_date=" + this.state.begin_date + "0101"
        + "&end_date=" + this.state.end_date + "1231";

    API.searchNYT(query)
      .then(res => {
        this.setState({ api_search_results: res.data.response.docs });
      })
      .catch(err => console.log(err));
    this.setState({
      topic_sought: "",
      begin_date: "",
      end_date: ""
    });
  };

  loadSavedArticles = () => {
    API.getArticles()
      .then(res => {
        this.setState({ saved_articles: res.data, heading: "", body: "" });
      })
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  saveArticle = arta => {
      API.saveArticle(arta)
        .then(res => this.loadSavedArticles())
        .catch(err => console.log(err));
  };

  convertTimestamp = timestamp => {
    if (timestamp) {
      let year = timestamp.substring(0,4);
      const months = ["notamonth", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let monthIndex = parseInt(timestamp.substring(5,7));
      let month = months[monthIndex];
      let day = parseInt(timestamp.substring(8, 10));
      let fancyDate = year + " " + month + " " + day;

      return fancyDate;
    }
    else { return ""; }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
    if (this.state.begin_date.length >= 8) {
      this.setState({
        begin_date: ""
      });
    }
    else if (this.state.end_date.length >= 8) {
      this.setState({
        end_date: ""
      });
    }

  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.begin_date || !this.state.end_date) {
      console.log("do NOTHING");
    }
    else {
      this.searchNYT();
    }
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-4">
            <Jumbotron>
              <div>Saved Articles</div>
            </Jumbotron>
            {this.state.saved_articles.length ? (
              <List>
                {this.state.saved_articles.map(article => (
                  <ListItem key={article._id}>
                    <a className="article_row" href={article.link} target="_blank">
                      <strong>
                        {article.title} 
                      </strong><br/>
                        <div className="dateBox">{this.convertTimestamp(article.timestamp)}</div>
                    </a>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No articles have been saved!</h3>
            )}
          </Col> 
          <Col size="md-3 sm-12">
            <Jumbotron>
              <div className="alternative"><span className="alternative">search</span><br/> articles</div>
            </Jumbotron>
            <form>
              <Input name="topic_sought" 
                placeholder="topic"
                value={this.state.topic_sought} 
                onChange={this.handleInputChange}></Input>
              <Input name="begin_date" 
                value={this.state.begin_date}
                placeholder="start year (YYYY)" 
                onChange={this.handleInputChange}></Input>
              <Input name="end_date" 
                placeholder="end year (YYYY)" 
                value={this.state.end_date}
                onChange={this.handleInputChange}></Input>
              <FormBtn onClick={this.handleFormSubmit}>search</FormBtn>
            </form>
          </Col>
          <Col size="md-5 sm-12">
            <Jumbotron>
              <div>New York Times Articles</div>
            </Jumbotron>
              {this.state.api_search_results.length ? (
              <List>
                {this.state.api_search_results.map(article => (
                  <ListItem key={article._id}>
                    <a className="article_row" href={article.web_url} target="_blank">
                      <strong>
                        {article.snippet} 
                      </strong><br/>
                        <div className="dateBox">{this.convertTimestamp(article.pub_date)}</div>
                    </a>
                    <SaveBtn onClick={() => this.saveArticle({ 
                      title: article.snippet,
                      link: article.web_url,
                      timestamp: article.pub_date
                    }) } />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No search results to display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
