import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CoinChangeVisualizer from './coin-change-interactive';
import CoinChangeVisualizerSetExpansion from './coin-change-set-expansion';

const VisualizationTabs = ()=> {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="Tabs for different visualizations">
                        <Tab label="Column-wise" value="1" />
                        <Tab label="Row-wise" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1"><CoinChangeVisualizer /></TabPanel>
                <TabPanel value="2"><CoinChangeVisualizerSetExpansion /></TabPanel>

            </TabContext>
        </Box>
    );
}

export default VisualizationTabs;