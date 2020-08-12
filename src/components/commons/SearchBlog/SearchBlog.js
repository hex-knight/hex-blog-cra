import _ from 'lodash'
//import faker from 'faker'
import React, { PureComponent } from 'react'
import { Search, Grid } from 'semantic-ui-react'




export default class SearchBlog extends PureComponent {
  
  constructor(props) {
      super(props)
  
      this.state = {
           isLoading: false,
           results: [],
           value: '',
           source: this.props.dataSet
      }
    this.renderResults = this.renderResults.bind(this)
  }

  componentDidUpdate(prevProps){
      if(prevProps.dataSet !== this.props.dataSet){
          this.setState({source:this.props.dataSet})
      }
  }
  

  handleResultSelect = (e, { result }) => this.setState({ value: result.titulo })

  resetState = () => {
      this.setState({
          isLoading:false,
          results: [],
      })
  }
  
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 3) return this.resetState()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.titulo)||re.test(result.contenido)||re.test(result.fecha)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.source, isMatch),
      })
    }, 500)
  }

  renderResults = results =>{
      return [
         results.cover && (
          <div key='image' className='image'>
            <img src={results.cover} alt={results.titulo} />
          </div>
        ),
        <div key='content' className='content'>
          {results.titulo && <div className='title'>{results.titulo}</div>}
          {results.fecha && <div className='description'>{results.fecha}</div>}
          
        </div>,
        ]
  }

  render() {
    // const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            aligned={'left'}
            icon={'search'}
            
            loading={this.state.isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={this.state.results}
            value={this.state.value}
            resultRenderer={
                results => this.renderResults(results)
            }
          />
        </Grid.Column>
        {/* <Grid.Column width={10}>
          <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(this.state, null, 2)}
            </pre>
            <Header>Options</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(this.state.source, null, 2)}
            </pre>
          </Segment>
        </Grid.Column> */}
      </Grid>
    )
  }
}
