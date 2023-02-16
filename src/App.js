import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Card from './components/Card';

const API_URL = "http://localhost:5000/nodes";

function App() {
  const [nodes, setNodes]  = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);


  const loadMore = () => {
    if (!loading) {
      setLoading(true);
      fetch(`${API_URL}/${currentPage}`).then(r => r.json()).then((data) => {
        setNodes([
          ...nodes,
          ...data.nodes
        ]);
        setHasMore(true);
        setLoading(false);
        setCurrentPage(currentPage+1);
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  return (
    <div className="App">

      <div className="Nodes">
        <InfiniteScroll
          pageStart={1}
          loadMore={loadMore}
          hasMore={hasMore}
          loader={<div className="loader" key={0}>Loading ...</div>}
          useWindow={false}
        >
          {nodes.map(nodeObj => nodeObj.node).map((node) => (
            <Card
              key={node.nid}
              title={node.title}
              imageUrl={node.field_photo_image_section}
              lastUpdate={node.last_update}
            ></Card>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
