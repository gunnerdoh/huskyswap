import ListingCard from './ListingCard';
import Header from './Header';

function Dashboard( {user} ) {
  return (
    <div>
      <Header user={user} />
      <div>
        <img src='/icons/cover.png' id="cover-img" alt="Cover Image" />
      </div>
      <div id="listings-grid" className="mx-5">
        {/* Example listing cards */}
        <ListingCard title="Card title" description="Some quick example text to build on the card title." items={["An item", "A second item", "A third item"]} />
      </div>
    </div>
  )
}

export default Dashboard;



