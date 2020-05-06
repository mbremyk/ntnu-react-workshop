import React from 'react';

import {ShadowBox, Heading, Tags, Button, PromoBox} from "@telia/styleguide";

const Article = ({title, tags, onClick, children}) => (
    <ShadowBox>
        <article>
            <Heading level={2}>{title}</Heading>
            <Tags>{tags.map(tag => <Tags.Tag key={tag}>{tag}</Tags.Tag>)}</Tags>
            <div>
                {children}
            </div>
            <Button text='Les mer' onClick={onClick}/>
        </article>
    </ShadowBox>
);

export default Article;