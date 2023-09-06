import Founders from "./Founders";

function AboutPage() {
  return (
    <div className="text-center d-flex flex-column align-items-center mt-4">
      <div style={{ width: "800px" }}>
        <h1>Our Mission</h1>
        <div>
          To foster a sustainable future, we empower individuals and communities
          with a free platform, uniting them in the collective effort to create
          cleaner, more sustainable, and thriving environments worldwide.
        </div>
      </div>
      <Founders />
    </div>
  );
}

export default AboutPage;
