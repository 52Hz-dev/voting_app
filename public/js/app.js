class ProductList extends React.Component {
  constructor(props){
    super(props);
    this.handleProductUpVote=this.handleProductUpVote.bind(this)
    this.state={
      products:[]
    };
  }
  componentDidMount(){
    this.setState({products:Seed.products})
  }
  handleProductUpVote(productId){
    const nextProducts=this.state.products.map((product)=>{
      if(product.id===productId){
        return Object.assign({},product,{
          votes:product.votes+1,
                })
      }
      else {
        return product;
      }
    })
    this.setState({
      products:nextProducts,
    })
  }
  render() {
    const products =this.state.products.sort((a,b)=>{
      b.votes-a.votes;
    });
    const productComponents=products.map((product)=>(
      <Product
      key={`product-${product.id}`}
      id={product.id}
      title={product.title}
      description={product.description}
      url={product.url}
      votes={product.votes}
      submitterAvatarUrl={product.submitterAvatarUrl}
      productImageUrl={product.productImageUrl}
      onVote={this.handleProductUpVote}
      />
    ));
    return (
      <div className="ui unstackable items">
        {productComponents}
      </div>
    )
  }

}

class Product extends React.Component {
  constructor(props){
    super(props);
    this.handleUpVote=this.handleUpVote.bind(this);

  }
  handleUpVote(){
    this.props.onVote(this.props.id)
  }
  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl}/>
        </div>
        <div className="middle algined content ">
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className="large caret up icon"/>
            </a>
            {this.props.votes}
          </div>
          <div className="description">
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
            <span>Submit by:</span>
            <img className="ui avatar image" src={this.props.submitterAvatarUrl} />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ProductList />, document.getElementById("content"));
