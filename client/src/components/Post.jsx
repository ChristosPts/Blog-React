import React from 'react'

function Post() {
  return (
    <div className="post">
        <div className="post-image">
        <img src="https://www.iekakmi-roadtrips.gr/plugins/fullpage/examples/imgs/bg3.jpg" alt="" />
        </div>
        <div className="texts">
            <h2>Roadtrips and stuff</h2>
            <p className="info">
                <a className='author'>John Doe</a>
                <time> 08-06-2023 11:35</time>
            </p>
            <p className='summary'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas mollitia neque ratione impedit, cupiditate obcaecati non, ullam ex tenetur necessitatibus atque molestias provident dicta, sint amet fugiat eveniet.</p>
        </div>
  </div>
  )
}

export default Post