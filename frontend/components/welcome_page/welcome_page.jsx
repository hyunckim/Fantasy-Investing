import React from 'react';
const WelcomePage = () => {
  let placeholder = 'Lorem ipsum dolor sit amet, dapibus est tempus eget, vitae ornare viverra ipsum. Neque urna quis. Pellentesque vivamus dolor at et dui dis, sed litora aliquam eu eros. Nec consectetuer, luctus laborum turpis, suscipit auctor curabitur maecenas, non turpis luctus diam ipsum. Nascetur mauris pellentesque sodales ut quo, nullam pede vel vivamus leo praesent, vel nulla convallis vitae, proin pretium nibh pellentesque dapibus fermentum commodo. In vestibulum nunc wisi ut, urna commodo nunc nonummy voluptas magnis posuere, velit bibendum, nunc quam pede nascetur at etiam justo, vel itaque consectetuer ligula ipsum ornare. Dicta quis cras lorem, ornare lobortis aliquet, felis est accumsan quis, wisi at phasellus nulla. Pellentesque faucibus. Elit mauris sed quis, justo orci at nec at interdum enim, et phasellus, egestas non, tellus fermentum nibh posuere. A amet dolor in nunc cursus lacinia, in sit in enim etiam, vestibulum diam. Potenti quam occaecat pharetra ullamcorper mi enim, scelerisque libero ut ut, porttitor auctor ornare morbi ultrices porta, ut et ante massa faucibus rem, magna convallis tellus sed imperdiet praesent. Vel accumsan varius wisi vivamus faucibus, erat et tellus taciti lectus, dolor tristique tortor ac, egestas a a leo, id pretium semper imperdiet. In volutpat ut at morbi tortor urna. Tempor urna nec urna, praesent nulla. Dignissim tempus, praesent praesent imperdiet nec reiciendis faucibus, erat etiam tortor, mauris neque consectetuer erat nulla ligula eu. Est nam, cras maecenas nisl lacinia natoque cras semper, mauris metus morbi at aliquam dictum tincidunt. Odio erat sit sed non lectus donec, volutpat cum cursus laoreet morbi, eu nibh dapibus dolor fusce, hendrerit mauris posuere consectetuer neque. Integer ac libero praesent, viverra facilisi, pellentesque vitae eget.';
  return (
    <div className='welcome-page'>
      <div className='background-pic'>
      </div>

      <div className ='background-text'>
              <h1>
          Welcome to Fantasy Investing
        </h1>
        <h2>
          Your Future in Stocks...
        </h2>
      </div>
      <div className='content'>
            <h3>What is Fantasy Investing?</h3>
            <p>
              {placeholder}
            </p>
      </div>


    </div>
  );
};

export default WelcomePage;



    