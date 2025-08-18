import React from 'react';
import { Outlet } from 'react-router-dom';
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from "@openedx/frontend-plugin-framework";
import Layout from './src/Layout';

const config = {
    ...process.env,
    pluginSlots: {
        layout_plugin_slot: {
            plugins: [
                {
                    op: PLUGIN_OPERATIONS.Insert,
                    widget: {
                        id: "layout_plugin_slot",
                        type: DIRECT_PLUGIN,
                        priority: 1,
                        renderWidget: () => (
                            <Layout />
                        )
                    }
                }
            ]
        }
    }
}

export default config;