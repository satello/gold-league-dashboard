import React from 'react';
import {Radar, RadarChart, PolarGrid,
         PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer} from 'recharts';
import {Card, CardBlock} from 'reactstrap';


const data = [
    { subject: 'Math', A: 120, B: 110, fullMark: 150 },
    { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
    { subject: 'English', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
];




const RadarChartExample = () => (
    <Card>
        <CardBlock style={{width: '100%', height: '350px'}}>
            <h6 className="text-uppercase mb-4">Radar Chart</h6>
            <ResponsiveContainer>
                <RadarChart  cy={150} outerRadius={100} data={data}>
                    <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis/>
                </RadarChart>
            </ResponsiveContainer>
        </CardBlock>
    </Card>
)


export default RadarChartExample;
